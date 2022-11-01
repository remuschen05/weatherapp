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
    <div>
      <Navbar />
      <h1>sign in</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />

          <button onClick={() => setShowPassword((prevState) => !prevState)}>
            Show Password
          </button>
        </div>
        <div>
          <button>Sign In</button>
        </div>
        <Link to="/sign-up">Sign Up</Link>
      </form>
    </div>
  );
}

export default SignIn;
