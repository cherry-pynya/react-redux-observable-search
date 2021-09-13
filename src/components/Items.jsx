import { useSelector } from "react-redux";

export default function Items() {
    const data = useSelector((state) => state.search.data);

    return (
        <div>
            {data.map((el) => {
                return <div key={el.id}><span>{el.name}</span></div>
            })}
        </div>
    );
}