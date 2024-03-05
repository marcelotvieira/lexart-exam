import { Card, Image } from "antd";

export default function FlexCardWithLogo({ children, extraLink }) {
  return (
    <Card
      styles={{
        body: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
        }
      }}
      size="small"
      className="signin-form"
      method="post"
    >

      <div className="flex columned aligned-center gap2" style={{ margin: '2rem' }}>
        <Image
          preview={false}
          width={160}
          height={160}
          src="/assets/images/fallImage.png"
        />
        <div style={{ maxWidth: 120, fontWeight: 600 }}>{extraLink}</div>
      </div>

      {children}
    </Card>
  )
}