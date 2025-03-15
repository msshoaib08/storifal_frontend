'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function AnimatedButton() {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className="group relative inline-flex items-center gap-3 px-6 py-2.5 text-black font-bold bg-softPurple rounded-full transition-colors duration-300 border border-softPurple hover:border hover:border-softPurple hover:text-white hover:bg-transparent"
		>
			Get Started
			<span className="relative flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full overflow-hidden text-black">
				<motion.div
					initial={{ x: 0, y: 0 }}
					whileHover={{ x: '100%', y: '-100%' }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className="absolute flex items-center justify-center w-full h-full"
				>
					<ArrowUpRight size={18} />
				</motion.div>

				<motion.div
					initial={{ x: '-100%', y: '100%' }}
					whileHover={{ x: 0, y: 0 }}
					transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
					className="absolute flex items-center justify-center w-full h-full"
				>
					<ArrowUpRight size={18} />
				</motion.div>
			</span>
		</motion.button>
	);
}
