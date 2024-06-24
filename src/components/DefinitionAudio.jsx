/**
 * DefinitionAudio Component
 *
 * This component recieves audio url from API and returns
 * audio player if src exists, otherwise it returns null
 *
 * @param {string} props.audioSrc
 * @returns Audio Player component for phonetic spelling of word
 */

const DefinitionAudio = ({ audioSrc }) => {
  if (!audioSrc) return null;
  return <audio className="audio" controls src={audioSrc}></audio>;
};

export default DefinitionAudio;
