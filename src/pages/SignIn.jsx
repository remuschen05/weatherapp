import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/layout/Navbar';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto py-12 px-2">
        <h1 className="text-2xl bold underline py-4">Sign In</h1>
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
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              Show Password
            </button>
          </div>
          <div className="py-2">
            <button>Sign In</button>
          </div>
          <Link to="/sign-up">Sign Up</Link>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
