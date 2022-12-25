import { FC, useState } from 'react';
import './App.css';

const App: FC = () => {
	return (
		<main className="App">
			<h1>Sign Up</h1>
			<Login     />
		</main>
	);
};

export default App;

const Login: FC = () => {
  const [emailActive, setEmailActive] = useState<boolean>(false)
  const [passwordActive, setPasswordActive] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  function ActiveCheck(value: string, field: string) {
    if (field == "password") {
      if (value == '') {
        setPasswordActive(false)
      }
      else {
        setPasswordActive(true)
      }
    }
    else {
      if (value == '') {
				setEmailActive(false);
			} else {
				setEmailActive(true);
			}
    }
  }

  let strength: number = 0;
  let validation: Array<boolean> = [];
  const [validations, setValidations] = useState<boolean[]>([])
  const [strengths, setStrengths] = useState<number>(0)
  function validatePassword(e: string) {
		const password = e;
		validation = [
			password.length > 5,
			password.search(/[A-Z]/) > -1,
			password.search(/[0-9]/) > -1,
			password.search(/[$&+,:;=?@#]/) > -1,
		];
    setValidations(validation)
    const Add = (a: number, b: boolean) => {
      if (b) {
        return a + 1;
      }
        return a;
    }
		strength = validation.reduce((acc, cur) => Add(acc, cur), 0);
    setStrengths(strength)

	}


      return (
				<form>
					<div className="field">
						<label htmlFor="email" className={emailActive ? 'active' : 'label'}>
							Email
						</label>
						<input
							type="email"
							onChange={(e) => {
								ActiveCheck(e.target.value, 'email');
							}}
							name="email"
							className="input"
							placeholder=""
						/>
					</div>
					<div className="field">
						<label
							htmlFor="password"
							className={passwordActive ? 'active' : 'label'}
						>
							Password
						</label>
						<input
							type={showPassword ? 'text' : 'password'}
							onChange={(e) => {
								ActiveCheck(e.target.value, 'password');
								validatePassword(e.target.value);
							}}
							name="password"
							className="input"
							placeholder=""
						/>
            <span className='toggle-password' onMouseOut={() => setShowPassword(false)} onMouseOver={() => setShowPassword(true)}>
              {showPassword ? '👀' : '🙈'}
            </span>
					</div>

					<div className="strength">
						<span
							className={strengths > 0 ? ' bar-1 bar-show bar' : 'bar bar-1'}
						></span>
						<span
							className={strengths > 1 ? ' bar-2 bar-show bar ' : 'bar bar-2'}
						></span>
						<span
							className={strengths > 2 ? ' bar-3 bar-show bar' : 'bar bar-3'}
						></span>
						<span
							className={strengths > 3 ? ' bar-4 bar-show bar' : 'bar bar-4'}
						></span>
					</div>

					<ul>
						<li>
							{' '}
							{validations[0] ? '✔️' : '❌'} must be at least 5 characters
						</li>
						<li>
							{' '}
							{validations[1] ? '✔️' : '❌'} must contain a capital letter
						</li>
						<li> {validations[2] ? '✔️' : '❌'} must contain a number</li>
						<li>
							{' '}
							{validations[3] ? '✔️' : '❌'} must contain one of $&+,:;=?@#
						</li>
					</ul>
				</form>
			);
    }
  