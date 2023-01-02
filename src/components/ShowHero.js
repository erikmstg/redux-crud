import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { deleteHero, getHeros, heroSelectors } from "../features/heroSlice"
import { Link } from "react-router-dom"

const ShowHero = () => {
    const dispatch = useDispatch()
    const heros = useSelector(state => heroSelectors.selectAll(state))

    useEffect(() => {
        dispatch(getHeros())
    }, [dispatch])

    return (
        <div className="box mt-5">
            <Link to="/add" className="button is-small is-outlined is-success">Add</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Hero</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {heros.map((hero, i) => (
                        <tr key={(hero.id).toString()}>
                            <td>{i + 1}</td>
                            <td>{hero.heroName}</td>
                            <td>{hero.role}</td>
                            <td className="">
                                <Link to={`/edit/${hero.id}`} className="button is-info is-small is-outlined mr-4">
                                    Edit
                                </Link>
                                <button onClick={() => dispatch(deleteHero(hero.id))} className="button is-danger is-small is-outlined">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShowHero
