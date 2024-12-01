import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CustomFilledButton({ btnText, onClick, icon = null }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: '#fde047' }}
      className="w-fit px-4 py-3 sm:px-10 sm:py-3 bg-yellow-200 border-neutral-600 border rounded-full text-white dark:text-black font-semibold"
      onClick={onClick}
    >
      {icon ? (
        <div className="flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={icon} className="text-black" />
          {btnText}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">{btnText}</div>
      )}
    </motion.button>
  );
}

export function CustomSecondaryButton({ btnText, onClick, icon = null }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="w-fit px-4 py-3 sm:px-10 sm:py-3 bg-neutral-500 border-neutral-600 border rounded-full text-white font-semibold"
      onClick={onClick}
    >
      {icon ? (
        <div className="flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={icon} className="text-white" />
          {btnText}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">{btnText}</div>
      )}
    </motion.button>
  );
}
