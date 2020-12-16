const viDictionary = {
  // Common
  ok: 'OK',
  cancel: 'Hủy',
  next: 'Tiếp',
  back: 'Quay lại',
  submit: 'Gửi',
  update: 'Cập nhật',
  // Image Picker
  image_picker: 'Chọn ảnh',
  take_photo: 'Chụp ảnh',
  choose_from_library: 'Chọn từ thư viện ảnh',
  // Form
  email: 'Email',
  email_placeholder: 'Nhập email',
  email_invalid: 'Email không hợp lệ',
  email_required: 'Thiếu email',

  name: 'Tên',
  name_placeholder: 'Nhập tên',
  name_required: 'Thiếu tên',

  birthday: 'Ngày sinh',
  birthday_required: 'Thiếu ngày sinh',

  password: 'Mật khẩu',
  password_required: 'Thiếu mật khẩu',
  password_placeholder: 'Nhập mật khẩu',
  password_weak_warning: 'Mật khẩu yếu',

  confirm_password: 'Xác nhận mật khẩu',
  confirm_password_placeholder: 'Nhập lại mật khẩu',
  confirm_password_required: 'Thiếu xác nhận mật khẩu',
  passwords_not_match: 'Mật khẩu không giống nhau',

  current_password: 'Mật khẩu hiện tại',
  current_password_placeholder: 'Nhập mật khẩu hiện tại',
  current_password_required: 'Thiếu mật khẩu hiện tại',
  // Login
  login: 'Đăng Nhập',
  forgot_password: 'Quên mật khẩu',
  dont_have_account: 'Bạn chưa có tài khoản? ',
  reset_password_success:
    'Hướng dẫn thay đổi mật khẩu đã được gửi vào email của bạn.',
  register_now: 'Đăng ký ngay',
  // Register
  register: 'Đăng Ký',
  have_an_account: 'Bạn đã có tài khoản? ',
  // Setting
  setting: 'Cài Đặt',
  update_profile_success: 'Cập nhật thành công',
  logout: 'Đăng Xuất',
  // Change password
  change_password: 'Đổi mật khẩu',
  new_password: 'Mật khẩu mới',
  confirm_new_password: 'Xác nhận mật khẩu mới',
}

const enDictionary = {
  ok: 'OK',
  cancel: 'Cancel',
  next: 'Next',
  back: 'Back',
  submit: 'Submit',
  update: 'Update',
  // Image Picker
  image_picker: 'Pick image',
  take_photo: 'Take photo',
  choose_from_library: 'Choose from library',
  // Form
  email: 'Email',
  email_placeholder: 'Input email',
  email_invalid: 'Email invalid',
  email_required: 'Email required',

  name: 'Name',
  name_placeholder: 'Input Name',
  name_required: 'Name required',

  birthday: 'Birthday',
  birthday_placeholder: 'Input Birthday',

  password: 'Password',
  password_placeholder: 'Input password',
  password_required: 'Password required',
  password_weak_warning: 'Password is weak',

  confirm_password: 'Confirm password',
  confirm_password_placeholder: 'Input Confirm password',
  confirm_password_required: 'Confirm password required',
  passwords_not_match: "Passwords doesn't match",

  current_password: 'Current password',
  current_password_placeholder: 'Input current password',
  current_password_required: 'Current password required',
  // Login
  login: 'Login',
  dont_have_account: "Don't have account? ",
  register_now: 'Register Now',
  forgot_password: 'Forgot Password',
  reset_password_success:
    'The reset password instruction has been sent to your email.',
  // Register
  register: 'Register',
  have_an_account: 'Have an account? ',
  // Setting
  setting: 'Setting',
  update_profile_success: 'Update profile success',
  logout: 'Logout',
  // Change password
  change_password: 'Change Password',
  new_password: 'New password',
  confirm_new_password: 'Confirm new password',
}

class I18n {
  language = 'en'

  changeLanguage = language => {
    this.language = language
  }

  get = key => {
    if (this.language === 'vi') {
      return viDictionary[key] || key
    }
    return enDictionary[key] || key
  }
}

export default new I18n()
