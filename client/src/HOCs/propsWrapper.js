import customProps from './customProps'

const translateProps = (props) => {
    var _props;
    switch (props.selection) {
        case 'Day':
            _props = { ...customProps.day() }
            break;
        case 'Month':
            _props = { ...customProps.month() }
            break;
        case 'Year':
            _props = { ...customProps.year(props.value) }
            break;
        default:
            _props = {}
    }
    const newProps = {...props, ..._props}
    return newProps
}

export default (wrappedComponent) => {
    return function wrappedRender(args) {
        return wrappedComponent(translateProps(args));
    }
}