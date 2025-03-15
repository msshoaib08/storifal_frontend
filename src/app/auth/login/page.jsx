import LoginForm from './form';

const LoginPage = () => {
	return (
		<div className="flex min-h-screen max-w-lg w-full items-center justify-center bg-black text-lightGray">
			<div className="max-w-7xl w-full px-5 md:px-10 mx-auto">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
