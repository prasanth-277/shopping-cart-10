import { observable } from "mobx";
import { action } from "mobx";
import * as Cookies from "js-cookie";
import AutheAPICall from "../NetworkCalls/AutheAPICall";
class AuthenticationStore {
  @observable userName = "";
  @observable password = "";

  @action handleUserNameChange = e => {
    this.userName = e.target.value;
  };

  @action handlePasswordChange = e => {
    this.password = e.target.value;
  };

  ///////////////////////
  @action postSignUpCredentials(registerationSucces, registerationFail) {
    const Request = {
      username: this.userName,
      password: this.password
    };
    AutheAPICall(
      "https://user-shopping-cart.getsandbox.com/sign_up/v1/",
      Request
    )
      .then(res => res.json())
      .then(res => {
        if (res.status === "ok") {
          registerationSucces();
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText
          });
        }
      })
      .catch(err => {
        registerationFail();
      });
    this.userName = "";
    this.password = "";
  }

  ///////////////////////////////////////

  @action postLogiInCredentials(successLogIn, failedLogin, verifyUser) {
    const Request = {
      username: this.userName,
      password: this.password
    };
    AutheAPICall("https://user-shopping-cart.getsandbox.com/login/v1/", Request)
      .then(res => res.json())
      .then(res => {
        if (res.status === "ok") {
          Cookies.set("loginUser", res.accessToken);
          successLogIn();
        } else {
          failedLogin();
          return Promise.reject({
            status: res.status,
            statusText: res.statusText
          });
        }
      })
      .catch(err => {
        verifyUser();
        console.log("error");
      });
    this.userName = "";
    this.password = "";
  }
}
export default AuthenticationStore;
