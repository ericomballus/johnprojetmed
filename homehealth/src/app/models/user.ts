export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  password: string;
  isCompany: boolean;
  roles: number[]; //1= homehealth; 2 =companyAdmin; 3= userCompany; 4= simple user
}
/*

@example

// 'recaptcha-container' is the ID of an element in the DOM.
var applicationVerifier = new firebase.auth.RecaptchaVerifier(
'recaptcha-container');
var provider = new firebase.auth.PhoneAuthProvider();
provider.verifyPhoneNumber('+16505550101', applicationVerifier)
.then(function(verificationId) {
var verificationCode = window.prompt('Please enter the verification ' +
'code that was sent to your mobile device.');
return firebase.auth.PhoneAuthProvider.credential(verificationId,
verificationCode);
})
.then(function(phoneCredential) {
return firebase.auth().signInWithCredential(phoneCredential);
});
@param auth
The Firebase Auth instance in which sign-ins should occur. Uses the default Auth instance if unspecified.
*/
