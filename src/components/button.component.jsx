'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export function AnimatedButton() {
	const router = useRouter();
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.button
			className="group relative inline-flex items-center gap-3 px-6 py-2.5 font-bold rounded-full transition-colors duration-300"
			style={{
				backgroundColor: isHovered ? 'transparent' : '#BBACFF',
				color: isHovered ? 'white' : 'black',
				border: '1px solid #BBACFF',
			}}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			onClick={() => router.push('/blog')}
		>
			Get Started
			<span className="relative flex items-center justify-center w-8 h-8 bg-white rounded-full overflow-hidden">
				<motion.div
					className="absolute flex items-center justify-center w-full h-full text-purple-700"
					animate={{
						x: isHovered ? '150%' : '0%',
						y: isHovered ? '-150%' : '0%',
					}}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
				>
					<ArrowUpRight size={18} />
				</motion.div>

				<motion.div
					className="absolute flex items-center justify-center w-full h-full text-black"
					initial={{ x: '-150%', y: '150%' }}
					animate={{
						x: isHovered ? '0%' : '-150%',
						y: isHovered ? '0%' : '150%',
					}}
					transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
				>
					<ArrowUpRight size={18} />
				</motion.div>
			</span>
		</motion.button>
	);
}
