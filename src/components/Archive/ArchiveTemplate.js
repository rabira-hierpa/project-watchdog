import React, { PureComponent } from "react";
import ArchiveDetails from "./ArchiveDetails";

class ArchiveTemplate extends PureComponent {
  constructor(props) {
    super(props);
    this.files = props.filelocation;
    this.props = props;
    this.state = {
      project: this.props,
      showDetail: false,
    };
  }

  viewDetails() {
    let doesShow = this.state.showDetail;
    if (doesShow === false) {
      this.setState({ showDetail: !doesShow });
    } else {
      this.setState({ showDetail: !doesShow });
    }
  }

  render() {
    let attachedFiles = this.files.length;
    let archiveTemp;
    if (this.state.showDetail === false) {
      archiveTemp = (
        <div>
          <div className="card hoverable">
            <div className="view overlay" />
            <div className="card-body">
              <a href="" className="activator p-3 mr-2">
                <i className="fa fa-paperclip" />
                {attachedFiles}
              </a>
              <h4 className="card-title">{this.props.title}</h4>
              <hr />
              <p className="card-text d-block text-truncate">
                {this.props.description}
              </p>
              <a onClick={() => this.viewDetails()} className="link-text">
                <h5 className="pull-right">
                  Show More <i className="fa fa-chevron-down" />
                </h5>
              </a>
              <br />
            </div>
          </div>
          <br />
        </div>
      );
    } else if (this.state.showDetail === true) {
      archiveTemp = (
        <ArchiveDetails
          key={this.state.project._id}
          project={this.state.project}
          collapse={() => this.viewDetails()}
        />
      );
    }

    return <div className="col-md-4">{archiveTemp}</div>;
  }
}

export default ArchiveTemplate;
