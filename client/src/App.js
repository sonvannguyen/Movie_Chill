import {BrowserRouter} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import RoutesApp from './routes/RoutesApp';

const queryClient = new QueryClient({
	// tu cau hinh cac default options 
		defaultOptions: {
		    queries: {
		      retry: false,
		      refetchOnWindowFocus: false
		    }
		  }
})

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RoutesApp/>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
