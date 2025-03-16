'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedButton } from '../button.component';
import SectionHeading from '../heading.component';

const HomeSection = () => {
	return (
		<section>
			<div className="max-w-7xl w-full mx-auto px-5 md:px-10">
				<div className="flex flex-col gap-10 items-center text-center">
					{/* Home Content */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						viewport={{ once: true, amount: 0.2 }}
						className="flex gap-6 flex-col md:max-w-3xl mx-auto w-full"
					>
						<SectionHeading
							text="Unleash Your Voice, Craft Stories that Resonate"
							highlight="Craft Stories"
						/>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.8 }}
							viewport={{ once: true, amount: 0.3 }}
							className="text-lightGray text-lg font-medium tracking-wide"
						>
							Storifal helps you turn ideas into powerful narratives. Write,
							publish, and share your stories while growing and engaging with
							your audience effortlessly.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.6, duration: 0.6 }}
							viewport={{ once: true, amount: 0.3 }}
							className="mt-4"
						>
							<AnimatedButton />
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.8 }}
							viewport={{ once: true, amount: 0.3 }}
							className="flex items-center justify-center gap-6 mt-10"
						>
							<div className="flex flex-col gap-2">
								<div className="flex items-center">
									{[...Array(5)].map((_, idx) => (
										<motion.div
											key={idx}
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
											viewport={{ once: true }}
										>
											<Image
												src="/assets/star-icon.svg"
												width={20}
												height={20}
												alt="star-icon"
												unoptimized
											/>
										</motion.div>
									))}
								</div>
								<span className="font-bold tracking-wide">
									Over 1k+ Active Users
								</span>
							</div>

							<div className="flex">
								{[
									'avatar1.png',
									'avatar2.png',
									'avatar3.png',
									'avatar4.png',
								].map((avatar, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, scale: 0.9, x: -10 }}
										whileInView={{ opacity: 1, scale: 1, x: 0 }}
										transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
										viewport={{ once: true }}
										className={`${index !== 0 ? '-ml-4' : ''}`}
									>
										<Image
											src={`/assets/avatars/${avatar}`}
											width={60}
											height={60}
											className="bg-white rounded-full shadow-2xl border-4 border-mutedGray/50"
											alt="avatar icon"
										/>
									</motion.div>
								))}
							</div>
						</motion.div>
					</motion.div>

					{/* Home Image */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
						viewport={{ once: true, amount: 0.3 }}
						className="h-full w-full flex justify-center items-center mt-16"
					>
						<Image
							src="/assets/dashboard-img.svg"
							width={1000}
							height={600}
							alt="home image"
							className="shadow-2xl rounded-xl border-4 border-mutedGray/50"
							unoptimized
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default HomeSection;
