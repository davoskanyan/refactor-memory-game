import { Link } from "react-router-dom";
import examples from "./examples";

export default function Home() {
  return (
    <ul>
      {examples.map(({ name, url }) => (
        <li key={url}>
          <Link to={url}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
