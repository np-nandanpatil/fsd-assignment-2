import { useState } from 'react';
import { motion } from 'framer-motion';

interface Candidate {
  id: number;
  name: string;
  votes: number;
}

const VotingApp = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: 'Candidate A', votes: 0 },
    { id: 2, name: 'Candidate B', votes: 0 },
    { id: 3, name: 'Candidate C', votes: 0 },
  ]);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (candidateId: number) => {
    if (hasVoted) return;

    setCandidates(candidates.map(candidate =>
      candidate.id === candidateId
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate
    ));
    setHasVoted(true);
  };

  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map(candidate => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 text-center"
          >
            <h3 className="text-lg font-semibold text-primary-600 mb-2">
              {candidate.name}
            </h3>
            <p className="text-2xl font-bold text-gray-700 mb-4">
              {candidate.votes} votes
            </p>
            <button
              onClick={() => handleVote(candidate.id)}
              disabled={hasVoted}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasVoted ? 'Voted' : 'Vote'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold text-primary-600 mb-2">
          Total Votes: {totalVotes}
        </h3>
        {hasVoted && (
          <p className="text-sm text-gray-600">
            Thank you for voting! You can only vote once.
          </p>
        )}
      </div>
    </div>
  );
};

export default VotingApp; 