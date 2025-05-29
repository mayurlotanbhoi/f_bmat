// src/components/ErrorBoundary.jsx
import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return <div>Something went wrong!</div>;
}