import { useState } from 'react';
import { motion } from 'framer-motion';
import { HandThumbUpIcon as ThumbUpIcon, HandThumbDownIcon as ThumbDownIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as ThumbUpSolidIcon, HandThumbDownIcon as ThumbDownSolidIcon } from '@heroicons/react/24/solid';

const PostReactions = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') {
        setDislikes(dislikes - 1);
      }
      setLikes(likes + 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikes(dislikes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'like') {
        setLikes(likes - 1);
      }
      setDislikes(dislikes + 1);
      setUserReaction('dislike');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-primary-600 mb-4">
          Post Reactions
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              userReaction === 'like'
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {userReaction === 'like' ? (
              <ThumbUpSolidIcon className="w-5 h-5" />
            ) : (
              <ThumbUpIcon className="w-5 h-5" />
            )}
            <span>{likes}</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              userReaction === 'dislike'
                ? 'text-red-600 bg-red-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {userReaction === 'dislike' ? (
              <ThumbDownSolidIcon className="w-5 h-5" />
            ) : (
              <ThumbDownIcon className="w-5 h-5" />
            )}
            <span>{dislikes}</span>
          </button>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          Total Reactions: {likes + dislikes}
        </p>
      </div>
    </motion.div>
  );
};

export default PostReactions; 