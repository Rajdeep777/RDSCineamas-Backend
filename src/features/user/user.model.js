class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }
  static getAll() {
    return users;
  }
}
const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "Admin",
    type: "Admin",
  },
  {
    id: 2,
    name: "User",
    email: "user@gmail.com",
    password: "User",
    type: "User",
  },
];
export default UserModel;
