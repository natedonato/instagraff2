# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  bio             :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  email           :string
#  full_name       :string
#

class User < ApplicationRecord
    validates :username, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
    
    after_initialize :ensure_session_token
    before_validation :add_default_pic
    attr_reader :password

    has_one_attached :profile_pic

    has_many :comments,
    foreign_key: :author_id,
    class_name: :Comment


    has_many :leader_rels, foreign_key: :leader_id, class_name: :Follow, dependent: :destroy
    has_many :followers, through: :leader_rels, source: :follower

    has_many :following_rels, foreign_key: :follower_id, class_name: :Follow, dependent: :destroy
    has_many :following, through: :following_rels, source: :leader
    
    has_many :photos,
    foreign_key: :poster_id,
    class_name: :Photo

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        if user && user.is_password?(password)
            return user
        end
        return nil 
    end

    def ensure_session_token
        self.session_token ||= make_unique_session_token()
    end

    def reset_session_token!
        self.session_token = make_unique_session_token()
        self.save!
        return self.session_token
    end


    private

    def make_unique_session_token
        self.session_token = SecureRandom.urlsafe_base64
            while User.find_by(session_token: self.session_token)
                self.session_token = SecureRandom.urlsafe_base64
            end
        return self.session_token
    end

    private def add_default_pic
    unless self.profile_pic.attached?
         self.profile_pic.attach(io: File.open(Rails.root.join("app", "assets", "images", "avatar.jpeg")), filename: 'avatar.jepg' , content_type: "image/jpeg")
        end
    end

end