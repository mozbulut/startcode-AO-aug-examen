
type Props = {
    onSubmit: (name: string) => void;

}
const AddClassroomForm: React.FC<Props> = ({ onSubmit }) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event)
    }

    return (<>
        <form onSubmit={handleSubmit}>

        </form>
    </>)
}

export default AddClassroomForm;
