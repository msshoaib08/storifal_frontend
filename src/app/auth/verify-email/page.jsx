const {
	default: VerifyEmail,
} = require('@/components/auth/verify-email.component');
const { default: Spinner } = require('@/components/spinner.component');
const { Suspense } = require('react');

const VerifyEmailPage = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<VerifyEmail />
		</Suspense>
	);
};
