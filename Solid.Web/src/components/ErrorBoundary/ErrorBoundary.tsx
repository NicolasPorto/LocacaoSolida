import React, { Component, ReactNode } from 'react';
import { Link } from "react-router-dom";

interface ErrorBoundaryProps {
    pathError?: boolean;
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo,
        });
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;