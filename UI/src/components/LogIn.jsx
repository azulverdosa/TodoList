// import { useState } from 'react';
// import { Navigate } from 'react-router-dom';

// import { userDatabase } from '../../data/mockUserData';
// import { findUserByName } from '../helpers/helpers';

// const LoginForm = ({ loginUser }) => {
//   const [userName, setUserName] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [loginStatus, setLoginStatus] = useState(false);
//   const [error, setError] = useState({ message: '' });

//   const handleNameInput = (event) => {
//     setUserName(event.target.value);
//   };

//   const handlePasswordInput = (event) => {
//     setUserPassword(event.target.value);
//   };

//   const handleLoginClick = (event) => {
//     event.preventDefault();
//     if (findUserByName(userName, userDatabase)) {
//       // && confirmPassword(userPassword, userDatabase)
//       setLoginStatus(true);
//     } else if (userName === '' || userPassword === '') {
//       setError({ message: 'Fields cannot be blank' });
//     } else {
//       setError({ message: 'No user found' });
//     }
//     // setUserName('');
//     // setUserPassword('');
//   };

//   if (loginStatus) {
//     return <Navigate replace to="/Lists" />;
//   }

//   return (
//     <div className="ui large form error">
//       <div className="two fields">
//         <form style={{ padding: 30 }}>
//           <div className="field">
//             <label>User Name</label>
//             <input value={userName} onChange={handleNameInput} type="text" />
//           </div>
//           <br />
//           <div className="field">
//             <label>Password</label>
//             <input value={userPassword} onChange={handlePasswordInput} type="password" />
//           </div>
//           <br />
//           <div>
//             <div className="ui error message">
//               {error.message && <div className="header">{error.message}</div>}
//             </div>
//             <button className="ui submit button" onClick={handleLoginClick}>
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
