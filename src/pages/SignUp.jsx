import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import Navbar from '../components/layout/Navbar';

function SignUp() {
  const [showPassword, setShowPassWord] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      updateProfile(auth.currentUser, {
        displayName: email,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto py-12 px-2">
        <h1 className="text-2xl bold underline py-4">Sign Up</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="border border-black border-solid rounded"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="py-2">
            <input
              type={showPassword ? 'text' : 'password'}
              className="border border-black border-solid rounded"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <button
              className="px-2"
              onClick={() => setShowPassWord((prevState) => !prevState)}
            >
              Show Password
            </button>
          </div>
          <div className="py-2">
            <button>Sign Up</button>
          </div>
          <Link to="/sign-in">Back to Sign-In</Link>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
