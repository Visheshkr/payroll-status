import { useContext, useEffect } from 'react'
import TitleContext from '../contexts/titleContext';

const useTitle = (name) => {

    const { title, setTitle } = useContext(TitleContext);

    useEffect(() => {
        setTitle(name);
    }, [name, setTitle]);

    return title;
}

export default useTitle