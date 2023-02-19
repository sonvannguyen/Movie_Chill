import {BrowserRouter} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
