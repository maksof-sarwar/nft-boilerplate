import { notification } from 'antd';
import { useCallback, useEffect, useState } from 'react';

export const useAsync = (func: Function, dependencies: any[] = []) => {
	const { execute, ...state } = useAsyncInternal(func, dependencies, true);

	useEffect(() => {
		execute();
	}, []);
	return state;
};

export const useAsyncFn = (func: Function, dependencies: any[] = []) => {
	return useAsyncInternal(func, dependencies, false);
};

function useAsyncInternal(
	func: Function,
	dependencies,
	initialLoading = false
) {
	const [loading, setLoading] = useState(initialLoading);
	const [value, setValue] = useState();
	const [error, setError] = useState();

	const execute = useCallback(
		(...params): Promise<any> => {
			setLoading(true);
			return func(...params)
				.then((data) => {
					setValue(data);
					setError(undefined);
					return data;
				})
				.catch((error) => {
					if (error != 'Network Error')
						notification.error({ message: 'Error', description: error });
					setError(error);
					setValue(undefined);
					return Promise.reject(error);
				})
				.finally(() => {
					setLoading(false);
				});
		},
		[dependencies]
	);
	return { execute, loading, error, value };
}