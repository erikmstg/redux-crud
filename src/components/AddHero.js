import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createHero } from "../features/heroSlice";

const AddHero = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const datas = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createHero(data))
    navigate("/")

  };

  return (
    <>
      <form className="box mt-5" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Hero name</label>
          <div className="control">
            <input
              name="heroName"
              type="text"
              className="input"
              placeholder="Hero name"
              onChange={(e) => datas(e)}
              value={data.heroName}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Role</label>
          <input
            name="role"
            type="text"
            className="input"
            placeholder="Role"
            onChange={(e) => datas(e)}
            value={data.role}
          />
        </div>
        <div className="field">
          <button className="button is-primary">Submit</button>
        </div>
      </form>
      <Link to="/" className="button is-small is-outlined is-success ml-5">Back</Link>
    </>
  );
};

export default AddHero
