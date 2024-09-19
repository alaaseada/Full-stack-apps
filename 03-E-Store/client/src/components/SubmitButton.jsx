import { useNavigation } from 'react-router-dom'

const SubmitButton = ({ text }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <button
      type="submit"
      className="btn btn-primary uppercase text-slate-200 py-2"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner loading-xs text-slate-800"></span>
      ) : (
        text
      )}
    </button>
  )
}
export default SubmitButton
