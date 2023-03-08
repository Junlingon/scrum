function LoginWrap(props) {
    return (
        <div className="login_wrap">
            <div className="login_box_wrap">
                {props.children}
            </div>
        </div>
    )
}
export default LoginWrap;