import axios from 'axios';

export async function handleNovelsAction(params: any) {
  const { Octokit } = await import('@octokit/rest');
  const { url, filepath } = params;
  const response = await axios.get(url);
  const content = response.data;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER as string,
      repo: process.env.GITHUB_REPO as string,
      branch: process.env.GITHUB_BRANCH as string,
      path: filepath,
      message: `Add novel content to ${filepath}`,
      content: Buffer.from(JSON.stringify(content)).toString('base64'),
    });
    return 'File uploaded successfully to GitHub';
  } catch (error: unknown) {
    if (error instanceof Error && 'status' in error && error.status === 404) {
      throw new Error(`GitHub repository not found. Please verify:
- Repository exists: ${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}
- Token has proper permissions
- Branch exists: ${process.env.GITHUB_BRANCH}`);
    } else if (error instanceof Error && 'status' in error && error.status === 401) {
      throw new Error('Invalid GitHub token. Please verify GITHUB_TOKEN in .env');
    } else if (error instanceof Error) {
      console.error('GitHub upload failed:', error);
      throw new Error(`Failed to upload file to GitHub: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred during GitHub upload');
    }
  }
}