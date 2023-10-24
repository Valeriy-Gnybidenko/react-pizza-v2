import { forwardRef, useState } from 'react'
import classNames from 'classnames'
import { Control, useController } from 'react-hook-form'
import { IForm } from '../types'

interface IProps {
  className?: string
  name: keyof IForm
  control: Control<IForm>
  text: string
  type?: string
  isInvalid: boolean
  focusChanged?: (isFocused: boolean) => void
  autocomplete?: string
}

const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      className,
      name,
      text,
      type,
      control,
      isInvalid,
      focusChanged,
      autocomplete,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const data = useController({ control, name })

    const changeFocus = (focused: boolean) => {
      setIsFocused(focused)

      if (focusChanged) {
        focusChanged(focused)
      }
    }

    const blurHandler = () => {
      data.field.onBlur()
      changeFocus(false)
    }

    return (
      <div
        className={classNames(
          'input',
          (data.field.value || isFocused) && 'input--active',
          className
        )}
      >
        <label htmlFor={name} className="input__label">
          {text}
        </label>
        <input
          id={name}
          type={type}
          ref={ref}
          name={name}
          onFocus={() => changeFocus(true)}
          {...rest}
          onBlur={blurHandler}
          autoComplete={autocomplete}
        />
        {isInvalid && <p className="input__error">Спробуйте ще раз</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input

Input.defaultProps = {
  className: '',
  type: 'text',
  focusChanged: () => {},
  autocomplete: 'on',
}
