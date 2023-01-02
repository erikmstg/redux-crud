import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { editHero, heroSelectors, getHeros } from "../features/heroSlice";

const Edit = () => {
    const [heroName, setHero] = useState("")
    const [role, setRole] = useState("")
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const heros = useSelector(state => heroSelectors.selectById(state, id))

    useEffect(() => {
        dispatch(getHeros())
    }, [dispatch])

    useEffect(() => {
        if (heros) {
            setHero(heros.heroName)
            setRole(heros.role)
        }
    }, [heros])

    const handleUpdate = async (e) => {
        e.preventDefault()
        dispatch(editHero({ id, heroName, role }))
        navigate("/")
    }
    return (
        <>
            <form className="box mt-5" onSubmit={handleUpdate}>
                <div className="field">
                    <label className="label">Hero name</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder="Hero name"
                            onChange={(e) => setHero(e.target.value)}
                            value={heroName}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Role</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Role"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                    />
                </div>
                <div className="field">
                    <button type="submit" className="button is-primary">Edit</button>
                </div>
            </form>
            <Link to="/" className="button is-small is-outlined is-success ml-5">Back</Link>
        </>
    );
};

export default Edit
