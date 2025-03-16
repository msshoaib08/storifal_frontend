'use client';

import { motion } from 'framer-motion';

const SectionHeading = ({ text, highlight = '', className = '' }) => {
	if (!text) return null;

	const parts = text.split(highlight);

	return (
		<motion.h2
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, duration: 0.8 }}
			viewport={{ once: true, amount: 0.3 }}
			className={`text-4xl md:text-5xl text-white font-bold leading-tight lg:leading-normal tracking-wide ${className}`}
		>
			{parts[0]}

			{/* Highlighted text */}
			{highlight && (
				<motion.span
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					viewport={{ once: true, amount: 0.3 }}
					className="text-softPurple"
				>
					{highlight}
				</motion.span>
			)}

			{parts[1]}
		</motion.h2>
	);
};

export default SectionHeading;
