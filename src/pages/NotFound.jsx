import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-8xl mb-8"
        >
          🔍
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 font-heading">
          Oops!
        </h1>
        
        <p className="text-xl text-surface-600 mb-2">
          We can't find that page
        </p>
        
        <p className="text-base text-surface-500 mb-8">
          But don't worry, let's get back to learning!
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="game-button inline-flex items-center gap-3 text-lg"
          >
            <ApperIcon name="Home" className="w-6 h-6" />
            Back to PhonicsPlay
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center gap-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="w-3 h-3 bg-primary rounded-full"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="w-3 h-3 bg-secondary rounded-full"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            className="w-3 h-3 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound