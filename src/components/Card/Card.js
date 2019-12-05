import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import {
  Card as MaterialCard,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'

import isEmpty from 'utils/isEmpty'

import CardButton from './components/CardButton'

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%', //16:9
  },
  content: {
    textAlign: 'left',
  },
})

const Card = ({
  children,
  className,
  description = null,
  forwardedRef = null,
  image = {},
  onClick = null,
  title,
  ...rest
}) => {
  const classes = useStyles()
  const { component, src, ...otherProps } = image

  return (
    <MaterialCard className={className} ref={forwardedRef} {...rest}>
      <CardActionArea onClick={onClick}>
        {!isEmpty(image) && (
          <CardMedia
            alt={title}
            className={classes.media}
            component={component}
            image={src}
            title={title}
            {...otherProps}
          />
        )}
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {!isEmpty(children) && <CardActions>{children}</CardActions>}
    </MaterialCard>
  )
}

Card.propTypes = {
  /**
   * The Card's description.
   */
  description: PropTypes.string,
  /**
   * The Card's image media. 'component' can either be a string (ex: 'section'), or a component.
   * You can also pass other props to the media container.
   */
  image: PropTypes.shape({
    component: PropTypes.elementType,
    src: PropTypes.string,
    '...rest': PropTypes.object,
  }),
  /**
   * Function fired when the card is pressed or clicked.
   */
  onClick: PropTypes.func,
  /**
   * The Card's title.
   */
  title: PropTypes.string.isRequired,
}

const DefaultComponent = styled(
  forwardRef((props, ref) => <Card {...props} forwardedRef={ref} />),
)``
/**
 * Exposed Components
 */
DefaultComponent.Button = CardButton
DefaultComponent.displayName = 'Card'
DefaultComponent.propTypes = Card.propTypes

export { Card as BaseCard }
export default DefaultComponent