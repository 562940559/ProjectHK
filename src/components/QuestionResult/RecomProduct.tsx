import styled from 'styled-components';

const Box = styled.div`
  margin-top: 40px;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  color: #f5f5ff;
`;
const Des = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  margin-top: 4px;
`;

export default function RecomProduct() {
  return (
    <Box>
      <Title>Recommended Products：</Title>
      <Des>
        Based On Your Evaluation Results, We Recommend Suitable Products For You
      </Des>
    </Box>
  );
}
