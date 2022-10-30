import styles from '../styles/index.module.scss';
import Account from '../components/Account';
import ImgCrop from 'antd-img-crop';
import { Upload, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export function Index() {
  const props: UploadProps = {
    name: 'file',
    customRequest: (file) => {
      console.log(file);
    },
    multiple: true,
    onChange(info) {
      console.log(info.file);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <Account />
        <ImgCrop grid shape="round" rotate>
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Upload.Dragger>
        </ImgCrop>
      </div>
    </div>
  );
}

export default Index;
