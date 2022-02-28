import { withRouter } from 'react-router-dom'
import { useAuth } from '../hooks'

const WithAuth = (props: any) => useAuth(props) && props.children

export default withRouter(WithAuth)
