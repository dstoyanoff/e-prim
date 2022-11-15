import { Box, Flex, Grid, ThemeProvider, Typography } from "e-prim";
import { GlobalStyles } from "../styles";
import { theme } from "../theme";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Box p={4} width="100%" m={{ xs: 2, md: 4 }}>
        <Typography variant="title.1">e-prim</Typography>
        <Typography variant="body.1">
          A set of tools to implement a design system on top of @emotion/css and @emotion/react as well as add some
          primitive components to make prototyping UI faster and easier
        </Typography>

        <Box
          label="link"
          onClick={console.log}
          p={4}
          css={({ breakpoint }) => ({
            width: breakpoint.md,
          })}
        >
          <Typography variant="title.1" p={4}>
            test
          </Typography>
        </Box>

        <Flex direction="column" gap={4} p={4}>
          <Box>item1</Box>
          <Box>item2</Box>
        </Flex>

        <Grid columns={[2, [100, 200]]}>
          <Box>item1</Box>
          <Box>item2</Box>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
