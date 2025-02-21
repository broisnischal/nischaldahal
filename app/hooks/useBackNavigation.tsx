import { type LinkProps, useLocation, useNavigate } from 'react-router';

export function useBackNavigation() {
  let navigate = useNavigate();
  let location = useLocation();

  let handleClick: LinkProps['onClick'] = (e) => {
    let back = location.state?.back;
    if (back) {
      e.preventDefault();
      navigate(back);
    }
  };
  return handleClick;
}
