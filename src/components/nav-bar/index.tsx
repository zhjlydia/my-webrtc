import { useNavigate } from 'react-router-dom';
import './index.less';

export interface routeItem {
    text: string;
    path: string;
}
type NavBarProps = {
    routes: routeItem[];
};

const NavBar: React.FC<NavBarProps> = (props) => {
    const navigate = useNavigate();
    const { routes } = props;
    return (
        <div className="nav-bar">
            {routes.map((item) => (
                <div className="nav-item" onClick={() => navigate(item.path)} key={item.path}>
                    {item.text}
                </div>
            ))}
        </div>
    );
};

export default NavBar;
