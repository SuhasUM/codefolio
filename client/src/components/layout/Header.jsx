import { useAppContext } from '../../context/AppContext';

export default function Header() {
  const { state, dispatch } = useAppContext();

  return (
    <header className="header card">
      <div>
        <p className="eyebrow">Frontend Assignment</p>
        <h1>Finance Dashboard UI</h1>
      </div>

      <div className="role-switcher">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={state.role}
          onChange={(e) => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </header>
  );
}
