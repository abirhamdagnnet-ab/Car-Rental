import { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Camera, Lock, Mail, User as UserIcon } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const fileInputRef = useRef(null);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateProfile({
      username: formData.username,
      email: formData.email,
    });
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      updateProfile({ profileImage: event.target?.result });
    };
    reader.readAsDataURL(file);
  };

  const roleLabel = user?.role?.toUpperCase() || 'USER';

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and profile photo</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-fit rounded-xl border border-border bg-card p-6 text-center shadow-sm">
          <div className="relative mb-4 inline-block">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-primary/20 object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/20 bg-primary text-primary-foreground">
                <span className="text-5xl">{user?.username?.charAt(0)?.toUpperCase() || '?'}</span>
              </div>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:opacity-90"
              type="button"
              aria-label="Change profile photo"
            >
              <Camera className="h-5 w-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <h2 className="mb-1 text-xl">{user?.username}</h2>
          <p className="mb-2 text-sm text-muted-foreground">{user?.email}</p>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            {roleLabel}
          </span>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl">Basic Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-all hover:opacity-90"
                  type="button"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm">
                    <UserIcon className="mr-2 inline h-4 w-4" />
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">
                    <Mail className="mr-2 inline h-4 w-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 rounded-lg bg-secondary px-4 py-2 text-secondary-foreground transition-all hover:opacity-90"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground shadow-md transition-all hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Username</p>
                    <p className="text-sm">{user?.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl">
                <Lock className="mr-2 inline h-5 w-5" />
                Password
              </h2>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-all hover:opacity-90"
                  type="button"
                >
                  Change Password
                </button>
              )}
            </div>

            {showPasswordForm ? (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="flex-1 rounded-lg bg-secondary px-4 py-2 text-secondary-foreground transition-all hover:opacity-90"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground shadow-md transition-all hover:opacity-90"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-muted-foreground">
                Keep your account secure by using a strong password and changing it regularly.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
