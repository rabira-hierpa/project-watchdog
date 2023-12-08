import { useLocation, useNavigate, useParams } from "react-router";

function withNavigation(Component) {
  return (props) => (
    <Component
      {...props}
      navigate={useNavigate()}
      params={useParams()}
      location={useLocation()}
    />
  );
}

export default withNavigation;
