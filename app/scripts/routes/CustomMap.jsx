import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';

import DeputiesVotes from './../containers/abortion-project/DeputiesVotes';
import SenatorsVotes from './../containers/abortion-project/SenatorsVotes';


const styles = {
  card: {
    minWidth: '100%',
    minHeigth: '100%',
    borderRadius: '3px',
  },
};

export class CustomMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  renderVotes(renderMap) {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <CardHeader title="Porcentaje de Votos de Diputados por Provincia" />
        <CardContent>
          <Card className={classes.card}>
            <div key="CustomMap">
              { renderMap() }
            </div>
          </Card>
        </CardContent>
      </Grid>
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderDeputiesVotes() {
    return <DeputiesVotes />;
  }

  renderSenatorsVotes() {
    return <SenatorsVotes />;
  }

  render() {
    const { value } = this.state;

    return (
      <div key="Orders">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Diputados" icon={<FavoriteIcon />} />
            <Tab label="Senadores" icon={<FavoriteIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && this.renderVotes(this.renderDeputiesVotes)}
        {value === 1 && this.renderVotes(this.renderSenatorsVotes)}
      </div>
    );
  }
}


/* istanbul ignore next */
function mapStateToProps(state) {
  return { votes: state.votes };
}

export default connect(mapStateToProps)(withStyles(styles)(CustomMap));

CustomMap.propTypes = {
  classes: PropTypes.object.isRequired,
  // votes: PropTypes.object.isRequired,
};
