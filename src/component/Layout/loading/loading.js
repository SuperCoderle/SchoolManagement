import './loading.css';
const Loading = ({ className }) => {
    return (
        <>
            <div className={`wrap-parent ${className}`}>
                <div className='wrap'>
                    <div className="loading">
                        <div className="bounceball"></div>
                        <div className="text">PLEASE WAIT...</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Loading;