/**
 * Format conversation from caption data
 * @param {Array} captionData - Array of caption objects
 * @returns {string} Formatted conversation text
 */
const formatConversation = (captionData) => {
  // Group consecutive captions by the same speaker
  let formattedConversation = [];
  let currentSpeaker = null;
  let currentMessage = '';

  captionData.forEach(caption => {
    if (caption.speaker === currentSpeaker) {
      // Continue the current message
      currentMessage += ' ' + caption.text;
    } else {
      // Save previous message if exists
      if (currentSpeaker) {
        formattedConversation.push(`${currentSpeaker}: ${currentMessage}`);
      }

      // Start new message
      currentSpeaker = caption.speaker;
      currentMessage = caption.text;
    }
  });

  // Add the last message
  if (currentSpeaker) {
    formattedConversation.push(`${currentSpeaker}: ${currentMessage}`);
  }

  return formattedConversation.join('\n');
};

module.exports = {
  formatConversation
};
